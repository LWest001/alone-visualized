import { AppShell, Burger, Flex, Group, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { createContext, useEffect, useState } from "react";

export const ActiveContext = createContext<
  [
    "items" | "survived" | "/" | undefined,
    React.Dispatch<
      React.SetStateAction<"items" | "survived" | "/" | undefined>
    > | null
  ]
>([undefined, null]);

export function Shell() {
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState<"items" | "survived" | "/" | undefined>(
    undefined
  );
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

  function onChange(to: "items" | "survived" | "/" | undefined) {
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
                <Image src="/logo.png" height={"100%"} />
              </Link>
            </Flex>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <Navbar onChange={onChange} value={active} />
        </AppShell.Navbar>

        <AppShell.Main h="100%">
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </ActiveContext.Provider>
  );
}
