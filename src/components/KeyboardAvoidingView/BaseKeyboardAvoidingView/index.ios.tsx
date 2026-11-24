import type {KeyboardAvoidingViewProps} from 'react-native-keyboard-controller';

import React from 'react';
import {KeyboardAvoidingView as KeyboardAvoidingViewComponent} from 'react-native-keyboard-controller';

function BaseKeyboardAvoidingView({shouldCorrectRootScreenOffset, automaticOffset, ...props}: KeyboardAvoidingViewProps & {shouldCorrectRootScreenOffset?: boolean}) {
    return (
        <KeyboardAvoidingViewComponent
            {...props}
            automaticOffset={shouldCorrectRootScreenOffset ? false : automaticOffset}
        />
    );
}

export default BaseKeyboardAvoidingView;
