import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function NavBar() {
  return (
    <Navbar className="bg-primary">
      <NavbarBrand>
        <p className="font-bold text-white">Je prépare mon titre</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#" className="text-white">
            Connexion
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href="#" variant="flat" className="text-white">
            Inscription
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
