import React from "react";
import items from "../assets/items.json";
import { List, ListItem, Text } from "@mantine/core";

function Items() {
  return (
    <div>
      <List>
        {items.map((item) => (
          <ListItem>
            <Text fz="xl">
              {item.id} {item.name}
            </Text>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Items;
