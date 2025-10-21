import {
  AppShell,
  Box,
  Burger,
  Flex,
  Group,
  Image,
  List,
  ListItem,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { createContext, useEffect, useState } from "react";

export const ActiveContext = createContext<
  [
    string | undefined,
    React.Dispatch<React.SetStateAction<string | undefined>> | null
  ]
>([undefined, null]);

export function Shell() {
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!active) {
      const path = location.pathname;
      setActive(
        path.includes("items")
          ? "items"
          : path.includes("survived")
          ? "survived"
          : "/"
      );
    }
  }, [active, location.pathname]);

  function onChange(to: string | undefined) {
    setActive(to);
    to && navigate(to);
    toggle();
  }

  return (
    <ActiveContext.Provider value={[active, setActive]}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Flex h="100%" p="md">
              <Link to="/" onChange={() => onChange("/")}>
                <Image src="/logo.png" height={"100%"} fit="contain" />
              </Link>
            </Flex>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <Navbar onChange={onChange} value={active} />
        </AppShell.Navbar>

        <AppShell.Main h="100%">
          <Outlet />
          {location.pathname === "/" && (
            <Box>
              <Title order={2}>Welcome to Alone: Visualized</Title>
              <Text>
                This site explores patterns and insights from the History
                Channel’s survival series Alone through interactive data
                visualizations. Each section highlights a different aspect of
                the show’s data:
                <Space h={20} />
                <List>
                  <ListItem key="duration">
                    <Text fw={700} component="span">
                      Survival Duration:{" "}
                    </Text>
                    Compare how long contestants lasted across seasons and
                    conditions.
                  </ListItem>
                  <ListItem key="gear">
                    <Text fw={700} component="span">
                      Gear Choices:{" "}
                    </Text>
                    Examine which survival items participants chose — and which
                    proved most common or successful.
                  </ListItem>
                  <ListItem key="map">
                    <Text fw={700} component="span">
                      Hometowns Map:{" "}
                    </Text>
                    Visualize where contestants hail from, revealing regional
                    trends and backgrounds.
                  </ListItem>
                </List>
                <Space h={20} />
                Explore the tabs in the menu to dive into the data and uncover
                what it takes to endure the wild.
              </Text>
            </Box>
          )}
        </AppShell.Main>
      </AppShell>
    </ActiveContext.Provider>
  );
}
