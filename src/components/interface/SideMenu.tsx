import { ChevronRight } from '../../icons';
import { tw } from '../../utilities/tw';

interface SideMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: () => void;
  children: JSX.Element | JSX.Element[];
}

export function SideMenu(props: SideMenuProps) {
  return (
    <div
      className={tw(
        `slide-${props.isMenuOpen ? 'open' : 'closed'} slide`,
        'flex'
      )}
    >
      <aside
        className={tw(
          `slide slide-${props.isMenuOpen ? 'open' : 'closed'}`,
          'bg-slate-100 dark:bg-slate-800',
          'text-black dark:text-white',
          'shadow-md',
          'flex-1 flex justify-between'
        )}
      >
        <ul
          className={tw(
            `${props.isMenuOpen ? 'z-50 w-full' : 'z-0 shadow-none w-0'} slide`,
            'shadow-xl',
            'relative'
          )}
        >
          {props.children}
        </ul>
      </aside>

      <button
        onClick={() => props.setIsMenuOpen()}
        type='button'
        className={tw(
          `${props.isMenuOpen ? 'z-0' : 'z-50'}`,
          'h-full',
          'flex justify-center items-center',
          'bg-slate-100 dark:bg-slate-800',
          'ml-auto',
          'brightness-95',
          'dark:hover:brightness-110 hover:brightness-90',
          'transition-[filter]'
        )}
      >
        <span
          className={tw(
            `spin ${props.isMenuOpen ? 'spinned-on' : 'spinned-off'}`,
            'w-12',
            'text-gray-300 dark:text-gray-500'
          )}
        >
          <ChevronRight height={8} width={8} />
        </span>
      </button>
    </div>
  );
}
