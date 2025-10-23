import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

type DropdownProps = {
    items: any[]
    selectedItem: any
    setSelectedItem: (item: any) => void
    alternateStyle?: boolean
}

const Dropdown:React.FC<DropdownProps> = ({ items, selectedItem, setSelectedItem, alternateStyle }) => {

    function getAlternateStyles() {
        if (alternateStyle) {
            return 'p-2'
        } else {
            return ''
        }
    }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className={`inline-flex w-64 justify-between bg-darkblue px-3 text-sm font-semibold text-white shadow-sm capitalize ${getAlternateStyles()}`}>
          {selectedItem}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-white" aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-64 origin-top-right bg-secondary shadow-lg focus:outline-none">
          <div>
            {items.map((item) => (
                <Menu.Item key={item}>
                    {() => (
                        <div
                            className={`block px-3 text-sm capitalize cursor-pointer text-white bg-darkblue hover:bg-light-secondary ${getAlternateStyles()}`}
                            onClick={() => setSelectedItem(item)}
                        >
                            {item}
                        </div>
                    )}
                </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown