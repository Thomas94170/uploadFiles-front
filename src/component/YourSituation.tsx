import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
  } from "@material-tailwind/react";

  type Props = {
    onSelect: (situation: "first" | "second") => void;
  };
  
   
  export function YourSituation({ onSelect }: Props) {
    return (
      <Menu>
        <MenuHandler>
          <Button className="bg-black text-white rounded-md px-4 py-2">Votre situation</Button>
        </MenuHandler>
        <MenuList>
        <MenuItem onClick={() => onSelect("first")}>Première Démarche</MenuItem>
        <MenuItem onClick={() => onSelect("second")}>Seconde Démarche</MenuItem>
          
        </MenuList>
      </Menu>
    );
  }