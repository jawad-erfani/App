import type {KeyboardAvoidingViewProps as RNKeyboardAvoidingViewProps} from 'react-native';

type KeyboardAvoidingViewProps = RNKeyboardAvoidingViewProps & {
    /**
     * Whether to compensate for the bottom safe area padding.
     * The KeyboardAvoidingView will use a negative keyboardVerticalOffset.
     */
    shouldOffsetBottomSafeAreaPadding?: boolean;

    /** Measure the view's screen position when calculating keyboard avoidance. */
    automaticOffset?: boolean;

    /** Correct automatic keyboard avoidance for the Android app window's screen position. */
    shouldCorrectRootScreenOffset?: boolean;
};

// eslint-disable-next-line import/prefer-default-export
export type {KeyboardAvoidingViewProps};
