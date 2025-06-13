import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

const CustomButton = ({
  children,
  loading,
  disabled,
  onPress,
  className = '',
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={ `bg-green-600 py-2 w-20 flex justify-center items-center ${disabled ? 'opacity-50' : ''} ${className}`}
    disabled={disabled || loading}
    activeOpacity={0.7}
  >
    {loading ? (
      <ActivityIndicator size="small" color="#fff" />
    ) : (
      typeof children === 'string' ? (
        <Text className="text-white text-base">{children}</Text>
      ) : (
        children
      )
    )}
  </TouchableOpacity>
);

export default CustomButton;