"use strict";

import React, { Component } from "react";
import { PanResponder, Animated, TouchableWithoutFeedback } from "react-native";

/**
 * @class Draggable
 * @description
 */
export default class Draggable extends Component {
  constructor(props) {
    super(props);

    const { position } = props;

    this.state = {
      pan: new Animated.ValueXY(position ? position : undefined),
      scale: new Animated.Value(1),
      lastPress: 0
    };

    this.onPress = this.onPress.bind(this);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponder: (e, gestureState) => {
        if (
          Platform.OS == "android" &&
          (gestureState.dx < 2 && gestureState.dx > -2) &&
          (gestureState.dy < 2 && gestureState.dy > -2)
        ) {
          return false;
        }

        return true;
      },
      onPanResponderGrant: (e, gestureState) => {
        // Set the initial value to the current state
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value
        });
        this.state.pan.setValue({ x: 0, y: 0 });
        Animated.spring(this.state.scale, {
          toValue: 1.1,
          friction: 3
        }).start();
      },

      // When we drag/pan the object, set the delate to the states pan position
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),

      onPanResponderRelease: (e, { vx, vy }) => {
        // Flatten the offset to avoid erratic behavior
        this.state.pan.flattenOffset();
        Animated.spring(this.state.scale, { toValue: 1, friction: 3 }).start();

        this.props.onDrop(this.props.clave, {
          x: this.state.pan.x._value,
          y: this.state.pan.y._value
        });
      }
    });
  }

  onPress() {
    var delta = new Date().getTime() - this.state.lastPress;

    if (delta < 200) {
      this.props.doubleTap();
    }

    this.setState({
      lastPress: new Date().getTime()
    });
  }

  render() {
    // Destructure the value of pan from the state
    let { pan, scale } = this.state;
    // Calculate the x and y transform from the pan value
    let [translateX, translateY] = [pan.x, pan.y];
    let rotate = "0deg";
    // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
    let imageStyle = {
      width: this.props.size,
      height: this.props.size,
      transform: [{ translateX }, { translateY }, { rotate }, { scale }]
    };

    return (
      <Animated.View style={imageStyle} {...this._panResponder.panHandlers}>
        <TouchableWithoutFeedback onPress={this.onPress}>
          {this.props.children}
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}
