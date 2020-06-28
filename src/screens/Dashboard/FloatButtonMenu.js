import React from "react";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./styles";

const FloatButtonMenu = props => {
  return (
      <ActionButton buttonColor="#EB4559" {...props}>
        <ActionButton.Item buttonColor="#f2b118" onPress={props.actions[0]}>
          <Icon name="share" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
  );
};

export default FloatButtonMenu;
