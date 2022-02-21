import { SideMenu } from '../interface/SideMenu';
import { tw } from '../../utilities/tw';

interface SideMenuLayoutProps {
  isMenuOpen: boolean;
  setIsMenuOpen: () => void;
  children: JSX.Element | JSX.Element[];
}

export function SideMenuLayout(props: SideMenuLayoutProps) {
  return (
    <div
      className={tw(
        `${props.isMenuOpen ? 'w-1/6' : 'min-w-12 w-12'}`,
        'mr-6',
        'flex',
        'slide'
      )}
    >
      <SideMenu
        isMenuOpen={props.isMenuOpen}
        setIsMenuOpen={props.setIsMenuOpen}
      >
        {props.children}
      </SideMenu>
    </div>
  );
}
