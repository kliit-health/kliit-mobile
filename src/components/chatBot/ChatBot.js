import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Random from "random-id";
import {
  Dimensions,
  Keyboard,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import { CustomStep, OptionsStep, TextStep } from "./steps/steps";
import schema from "./schemas/schema";
import ChatBotContainer from "./ChatBotContainer";
import InputView from "./InputView";
import Footer from "./Footer";
import Button from "./Button";
import ButtonText from "./ButtonText";

const { height, width } = Dimensions.get("window");

class ChatBot extends Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props);

    this.state = {
      renderedSteps: [],
      previousSteps: [],
      currentStep: {},
      previousStep: {},
      steps: {},
      editable: false,
      inputValue: "",
      inputInvalid: false,
      defaultUserSettings: {},
    };

    this.getStepMessage = this.getStepMessage.bind(this);
    this.getTriggeredStep = this.getTriggeredStep.bind(this);
    this.generateRenderedStepsById = this.generateRenderedStepsById.bind(this);
    this.renderStep = this.renderStep.bind(this);
    this.triggerNextStep = this.triggerNextStep.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
    this.setContentRef = this.setContentRef.bind(this);
    this.setInputRef = this.setInputRef.bind(this);
    this.setScrollViewScrollToEnd = this.setScrollViewScrollToEnd.bind(this);

    // instead of using a timeout on input focus/blur we can listen for the native keyboard events
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.setScrollViewScrollToEnd
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.setScrollViewScrollToEnd
    );
  }

  componentWillMount() {
    const {
      botDelay,
      botAvatar,
      botBubbleColor,
      botFontColor,
      customDelay,
      customLoadingColor,
      userDelay,
      userAvatar,
      userBubbleColor,
      userFontColor,
      optionBubbleColor,
      optionFontColor,
    } = this.props;
    const steps = {};

    const defaultBotSettings = {
      delay: botDelay,
      avatar: botAvatar,
      bubbleColor: "#3591F6",
      fontColor: botFontColor,
      optionBubbleColor: optionBubbleColor,
      optionFontColor: optionFontColor,
    };
    const defaultUserSettings = {
      delay: userDelay,
      avatar: userAvatar,
      bubbleColor: "#ECBEC6",
      fontColor: userFontColor,
    };
    const defaultCustomSettings = {
      delay: customDelay,
      loadingColor: customLoadingColor,
    };

    for (let i = 0, len = this.props.steps.length; i < len; i += 1) {
      const step = this.props.steps[i];
      let settings = {};

      if (step.user) {
        settings = defaultUserSettings;
      } else if (step.message || step.asMessage || step.options) {
        settings = defaultBotSettings;
      } else if (step.component) {
        settings = defaultCustomSettings;
      }

      steps[step.id] = Object.assign({}, settings, schema.parse(step));
    }

    schema.checkInvalidIds(steps);

    const firstStep = this.props.steps[0];

    if (firstStep.message) {
      const { message } = firstStep;
      firstStep.message = typeof message === "function" ? message() : message;
      steps[firstStep.id].message = firstStep.message;
    }

    const currentStep = firstStep;
    const renderedSteps = [steps[currentStep.id]];
    const previousSteps = [steps[currentStep.id]];

    this.setState({
      defaultUserSettings,
      steps,
      currentStep,
      renderedSteps,
      previousSteps,
    });
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onButtonPress() {
    const {
      renderedSteps,
      previousSteps,
      inputValue,
      defaultUserSettings,
    } = this.state;
    let { currentStep } = this.state;

    const isInvalid = currentStep.validator && this.checkInvalidInput();

    if (!isInvalid) {
      const step = {
        message: inputValue,
        value: inputValue,
      };

      currentStep = Object.assign({}, defaultUserSettings, currentStep, step);

      renderedSteps.push(currentStep);
      previousSteps.push(currentStep);

      this.setState({
        currentStep,
        renderedSteps,
        previousSteps,
        editable: false,
        inputValue: "",
      });
    }
  }

  getStepMessage(message) {
    const { previousSteps } = this.state;
    const lastStepIndex =
      previousSteps.length > 0 ? previousSteps.length - 1 : 0;
    const steps = this.generateRenderedStepsById();
    const previousValue = previousSteps[lastStepIndex].value;
    return typeof message === "function"
      ? message({ previousValue, steps })
      : message;
  }

  getTriggeredStep(trigger, value) {
    const steps = this.generateRenderedStepsById();
    return typeof trigger === "function" ? trigger({ value, steps }) : trigger;
  }

  setContentRef(c) {
    this.scrollView = c;
  }

  setInputRef(c) {
    this.inputRef = c;
  }

  setScrollViewScrollToEnd() {
    this.scrollView.scrollToEnd();
  }

  handleEnd() {
    const { previousSteps } = this.state;

    const renderedSteps = previousSteps.map((step) => {
      const { id, message, value, metadata } = step;
      return { id, message, value, metadata };
    });

    const steps = [];

    for (let i = 0, len = previousSteps.length; i < len; i += 1) {
      const { id, message, value, metadata } = previousSteps[i];
      steps[id] = { id, message, value, metadata };
    }

    const values = previousSteps
      .filter((step) => step.value)
      .map((step) => step.value);

    if (this.props.handleEnd) {
      this.props.handleEnd({ renderedSteps, steps, values });
    }
  }

  triggerNextStep(data) {
    const {
      renderedSteps,
      previousSteps,
      steps,
      defaultUserSettings,
    } = this.state;
    let { currentStep, previousStep } = this.state;
    const isEnd = currentStep.end;

    if (data && data.value) {
      currentStep.value = data.value;
    }
    if (data && data.trigger) {
      currentStep.trigger = this.getTriggeredStep(data.trigger, data.value);
    }

    if (isEnd) {
      this.handleEnd();
    } else if (currentStep.options && data) {
      const option = currentStep.options.filter(
        (o) => o.value === data.value
      )[0];
      const trigger = this.getTriggeredStep(option.trigger, currentStep.value);
      delete currentStep.options;

      currentStep = Object.assign(
        {},
        currentStep,
        option,
        defaultUserSettings,
        {
          user: true,
          message: option.label,
          trigger,
        }
      );

      renderedSteps.pop();
      previousSteps.pop();
      renderedSteps.push(currentStep);
      previousSteps.push(currentStep);

      this.setState({
        currentStep,
        renderedSteps,
        previousSteps,
      });
    } else if (currentStep.trigger) {
      const isReplace = currentStep.replace && !currentStep.option;

      if (isReplace) {
        renderedSteps.pop();
      }

      const trigger = this.getTriggeredStep(
        currentStep.trigger,
        currentStep.value
      );
      let nextStep = Object.assign({}, steps[trigger]);

      if (nextStep.message) {
        nextStep.message = this.getStepMessage(nextStep.message);
      } else if (nextStep.update) {
        const updateStep = nextStep;
        nextStep = Object.assign({}, steps[updateStep.update]);

        if (nextStep.options) {
          for (let i = 0, len = nextStep.options.length; i < len; i += 1) {
            nextStep.options[i].trigger = updateStep.trigger;
          }
        } else {
          nextStep.trigger = updateStep.trigger;
        }
      }

      nextStep.key = Random(24);

      previousStep = currentStep;
      currentStep = nextStep;

      if (nextStep.user) {
        this.setState({ editable: true });
        this.inputRef.focus();
      } else {
        renderedSteps.push(nextStep);
        previousSteps.push(nextStep);
      }

      this.setState({
        renderedSteps,
        previousSteps,
        currentStep,
        previousStep,
      });

      Keyboard.dismiss();
    }
  }

  generateRenderedStepsById() {
    const { previousSteps } = this.state;
    const steps = {};

    for (let i = 0, len = previousSteps.length; i < len; i += 1) {
      const { id, message, value, metadata } = previousSteps[i];
      steps[id] = { id, message, value, metadata };
    }

    return steps;
  }

  isLastPosition(step) {
    const { renderedSteps } = this.state;
    const { length } = renderedSteps;
    const stepIndex = renderedSteps.map((s) => s.key).indexOf(step.key);

    if (length <= 1 || stepIndex + 1 === length) {
      return true;
    }

    const nextStep = renderedSteps[stepIndex + 1];
    const hasMessage = nextStep.message || nextStep.asMessage;

    if (!hasMessage) {
      return true;
    }

    const isLast = step.user !== nextStep.user;
    return isLast;
  }

  isFirstPosition(step) {
    const { renderedSteps } = this.state;
    const stepIndex = renderedSteps.map((s) => s.key).indexOf(step.key);

    if (stepIndex === 0) {
      return true;
    }

    const lastStep = renderedSteps[stepIndex - 1];
    const hasMessage = lastStep.message || lastStep.asMessage;

    if (!hasMessage) {
      return true;
    }

    const isFirst = step.user !== lastStep.user;
    return isFirst;
  }

  handleKeyPress(event) {
    if (event.nativeEvent.key === "Enter") {
      this.onButtonPress();
    }
  }

  checkInvalidInput() {
    const { currentStep, inputValue } = this.state;
    const result = currentStep.validator(inputValue);
    const value = inputValue;

    if (typeof result !== "boolean" || !result) {
      this.setState({
        inputValue: result.toString(),
        inputInvalid: true,
        editable: false,
      });

      setTimeout(() => {
        this.setState({
          inputValue: value,
          inputInvalid: false,
          editable: true,
        });
        this.inputRef.focus();
      }, 2000);

      return true;
    }

    return false;
  }

  renderStep(step, index) {
    const { renderedSteps, previousSteps } = this.state;
    const {
      avatarStyle,
      avatarWrapperStyle,
      bubbleStyle,
      userBubbleStyle,
      optionStyle,
      optionElementStyle,
      customStyle,
      customDelay,
      hideBotAvatar,
      hideUserAvatar,
    } = this.props;
    const { options, component, asMessage } = step;
    const steps = {};
    const stepIndex = renderedSteps.map((s) => s.id).indexOf(step.id);
    const previousStep = stepIndex > 0 ? renderedSteps[index - 1] : {};

    for (let i = 0, len = previousSteps.length; i < len; i += 1) {
      const ps = previousSteps[i];

      steps[ps.id] = {
        id: ps.id,
        message: ps.message,
        value: ps.value,
      };
    }

    if (component && !asMessage) {
      return (
        <CustomStep
          key={index}
          delay={customDelay}
          step={step}
          steps={steps}
          style={customStyle}
          previousStep={previousStep}
          triggerNextStep={this.triggerNextStep}
        />
      );
    }

    if (options) {
      return (
        <OptionsStep
          key={index}
          step={step}
          triggerNextStep={this.triggerNextStep}
          optionStyle={optionStyle || bubbleStyle}
          optionElementStyle={optionElementStyle || bubbleStyle}
        />
      );
    }

    return (
      <TextStep
        key={index}
        step={step}
        steps={steps}
        previousValue={previousStep.value}
        triggerNextStep={this.triggerNextStep}
        avatarStyle={avatarStyle}
        avatarWrapperStyle={avatarWrapperStyle}
        bubbleStyle={bubbleStyle}
        userBubbleStyle={userBubbleStyle}
        hideBotAvatar={hideBotAvatar}
        hideUserAvatar={hideUserAvatar}
        isFirst={this.isFirstPosition(step)}
        isLast={this.isLastPosition(step)}
      />
    );
  }

  render() {
    const {
      currentStep,
      editable,
      inputInvalid,
      inputValue,
      renderedSteps,
    } = this.state;

    const {
      botBubbleColor,
      botFontColor,
      className,
      contentStyle,
      footerStyle,
      headerComponent,
      inputAttributes,
      inputStyle,
      keyboardVerticalOffset,
      placeholder,
      style,
      submitButtonStyle,
      submitButtonContent,
      scrollViewProps,
    } = this.props;

    const styles = {
      input: {
        borderWidth: 0,
        color: inputInvalid ? "#E53935" : "#4a4a4a",
        fontSize: 14,
        opacity: !editable && !inputInvalid ? 0.5 : 1,
        paddingRight: 16,
        paddingLeft: 16,
        height: 50,
        width: width - 80,
      },
      content: {
        height: height - 50,
        backgroundColor: "#eee",
      },
    };

    const textInputStyle = Object.assign({}, styles.input, inputStyle);
    const scrollViewStyle = Object.assign({}, styles.content, contentStyle);
    const platformBehavior = Platform.OS === "ios" ? "padding" : "height";
    const inputAttributesOverride =
      currentStep.inputAttributes || inputAttributes;

    return (
      <ChatBotContainer className={`rsc ${className}`} style={style}>
        {!!headerComponent && headerComponent}
        <ScrollView
          className="rsc-content"
          style={scrollViewStyle}
          ref={this.setContentRef}
          onContentSizeChange={this.setScrollViewScrollToEnd}
          {...scrollViewProps}
        >
          {_.map(renderedSteps, this.renderStep)}
        </ScrollView>
        <InputView
          behavior={platformBehavior}
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <Footer
            className="rsc-footer"
            style={footerStyle}
            disabled={!editable}
            invalid={inputInvalid}
            color={botBubbleColor}
          >
            <TextInput
              type="textarea"
              style={textInputStyle}
              className="rsc-input"
              placeholder={placeholder}
              ref={this.setInputRef}
              onKeyPress={this.handleKeyPress}
              onChangeText={(text) => this.setState({ inputValue: text })}
              value={inputValue}
              underlineColorAndroid="transparent"
              invalid={inputInvalid}
              editable={editable}
              {...inputAttributesOverride}
            />
            <Button
              className="rsc-button"
              style={submitButtonStyle}
              disabled={!editable}
              onPress={this.onButtonPress}
              invalid={inputInvalid}
              backgroundColor={botBubbleColor}
            >
              <ButtonText
                className="rsc-button-text"
                invalid={inputInvalid}
                fontColor={botFontColor}
              >
                {submitButtonContent}
              </ButtonText>
            </Button>
          </Footer>
        </InputView>
      </ChatBotContainer>
    );
  }
}

ChatBot.propTypes = {
  avatarStyle: PropTypes.object,
  avatarWrapperStyle: PropTypes.object,
  botAvatar: PropTypes.string,
  botBubbleColor: PropTypes.string,
  botDelay: PropTypes.number,
  botFontColor: PropTypes.string,
  bubbleStyle: PropTypes.object,
  optionStyle: PropTypes.object,
  optionBubbleColor: PropTypes.string,
  optionFontColor: PropTypes.string,
  optionElementStyle: PropTypes.object,
  contentStyle: PropTypes.object,
  customStyle: PropTypes.object,
  customDelay: PropTypes.number,
  customLoadingColor: PropTypes.string,
  className: PropTypes.string,
  handleEnd: PropTypes.func,
  headerComponent: PropTypes.element,
  hideBotAvatar: PropTypes.bool,
  hideUserAvatar: PropTypes.bool,
  footerStyle: PropTypes.object,
  inputAttributes: PropTypes.objectOf(PropTypes.any),
  inputStyle: PropTypes.object,
  keyboardVerticalOffset: PropTypes.number,
  placeholder: PropTypes.string,
  steps: PropTypes.array.isRequired,
  style: PropTypes.object,
  submitButtonStyle: PropTypes.object,
  submitButtonContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  userAvatar: PropTypes.string,
  userBubbleStyle: PropTypes.object,
  userBubbleColor: PropTypes.string,
  userDelay: PropTypes.number,
  userFontColor: PropTypes.string,
  scrollViewProps: PropTypes.object,
};

ChatBot.defaultProps = {
  avatarStyle: {},
  avatarWrapperStyle: {},
  botBubbleColor: "#6E48AA",
  botDelay: 1300,
  botFontColor: "#fff",
  bubbleStyle: {},
  optionStyle: {},
  optionBubbleColor: "#509AEC",
  optionFontColor: "#fff",
  optionElementStyle: {},
  contentStyle: {},
  customStyle: {},
  customDelay: 0,
  customLoadingColor: "#4a4a4a",
  className: "",
  footerStyle: {},
  handleEnd: undefined,
  hideBotAvatar: false,
  hideUserAvatar: false,
  inputAttributes: {},
  inputStyle: {},
  keyboardVerticalOffset: Platform.OS === "ios" ? 44 : 0,
  placeholder: "Type the message ...",
  headerComponent: undefined,
  style: {},
  submitButtonStyle: {},
  submitButtonContent: "SEND",
  userBubbleStyle: {},
  userBubbleColor: "#fff",
  userDelay: 500,
  userFontColor: "#4a4a4a",
  botAvatar:
    "data:image/png;base64,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",
  userAvatar:
    "data:image/png;base64,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",
  scrollViewProps: {},
};

export default ChatBot;
