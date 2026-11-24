import type {KeyboardAvoidingViewProps} from '@components/KeyboardAvoidingView/types';

import useWindowDimensions from '@hooks/useWindowDimensions';

import type {KeyboardAvoidingViewProps as ControllerKeyboardAvoidingViewProps} from 'react-native-keyboard-controller';

import React, {useContext, useEffect, useRef, useState} from 'react';
import {RootTagContext} from 'react-native';
import {KeyboardControllerNative, KeyboardAvoidingView as KeyboardAvoidingViewComponent} from 'react-native-keyboard-controller';

type BaseKeyboardAvoidingViewProps = ControllerKeyboardAvoidingViewProps & Pick<KeyboardAvoidingViewProps, 'shouldCorrectRootScreenOffset'>;

function BaseKeyboardAvoidingView({shouldCorrectRootScreenOffset = false, keyboardVerticalOffset = 0, onLayout, ...props}: BaseKeyboardAvoidingViewProps) {
    const rootTag = useContext(RootTagContext);
    const {windowHeight, windowWidth} = useWindowDimensions();
    const [rootScreenY, setRootScreenY] = useState(0);
    const [layoutRevision, setLayoutRevision] = useState(0);
    const measurementRequest = useRef(0);

    useEffect(() => {
        if (!shouldCorrectRootScreenOffset) {
            return;
        }

        const currentRequest = ++measurementRequest.current;
        let isCurrent = true;

        KeyboardControllerNative.viewPositionInWindow(rootTag)
            .then(({y}) => {
                if (isCurrent && currentRequest === measurementRequest.current) {
                    setRootScreenY(y);
                }
            })
            .catch(() => {
                if (isCurrent && currentRequest === measurementRequest.current) {
                    // Use the unadjusted offset if the root view cannot be measured.
                    setRootScreenY(0);
                }
            });

        return () => {
            isCurrent = false;
            measurementRequest.current += 1;
        };
    }, [rootTag, windowHeight, windowWidth, layoutRevision, shouldCorrectRootScreenOffset]);

    const handleLayout: typeof onLayout = (event) => {
        onLayout?.(event);
        if (shouldCorrectRootScreenOffset) {
            setLayoutRevision((revision) => revision + 1);
        }
    };

    return (
        <KeyboardAvoidingViewComponent
            {...props}
            automaticOffset={shouldCorrectRootScreenOffset || props.automaticOffset}
            // The controller measures the keyboard from the activity window, so remove the app root's screen offset.
            keyboardVerticalOffset={shouldCorrectRootScreenOffset ? keyboardVerticalOffset - rootScreenY : keyboardVerticalOffset}
            onLayout={handleLayout}
        />
    );
}

export default BaseKeyboardAvoidingView;
