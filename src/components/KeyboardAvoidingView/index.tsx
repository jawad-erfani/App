import useSafeAreaPaddings from '@hooks/useSafeAreaPaddings';

import React from 'react';

import type {KeyboardAvoidingViewProps} from './types';

import BaseKeyboardAvoidingView from './BaseKeyboardAvoidingView';

function KeyboardAvoidingView({
    shouldOffsetBottomSafeAreaPadding = false,
    shouldCorrectRootScreenOffset,
    keyboardVerticalOffset: keyboardVerticalOffsetProp,
    ...restProps
}: KeyboardAvoidingViewProps) {
    const {paddingBottom} = useSafeAreaPaddings(true);

    const keyboardVerticalOffset = (keyboardVerticalOffsetProp ?? 0) + (shouldOffsetBottomSafeAreaPadding ? -paddingBottom : 0);

    return (
        <BaseKeyboardAvoidingView
            {...restProps}
            keyboardVerticalOffset={keyboardVerticalOffset}
            shouldCorrectRootScreenOffset={shouldCorrectRootScreenOffset}
        />
    );
}

export default KeyboardAvoidingView;
