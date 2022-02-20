import { Link } from "gatsby";
import React from "react";
import logo from "../img/logo.png";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const navigation = [
  { name: "Blog", href: "/blog" },
  { name: "Events", href: "#" },
  { name: "About", href: "#" },
  { name: "Donations", href: "#" },
  { name: "Contact", href: "#" },
];

const Navbar = class extends React.Component {
  render() {
    return (
      <Disclosure as="nav" className="bg-beige-primary">
        {({ open }) => (
          <>
            <div className="max-w-full mx-auto px-2 md:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-primary-green-dark hover:text-primary-beige hover:bg-primary-green-dark">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center md:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <Link to="/">
                      <img
                        className="block lg:hidden h-14 w-auto"
                        src={logo}
                        alt="Workflow"
                      />
                      <img
                        className="hidden lg:block h-14 w-auto"
                        src={logo}
                        alt="Workflow"
                      />
                    </Link>
                  </div>
                  <div className="hidden md:block md:ml-6 items-center">
                    <div className="flex space-x-4 items-center">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="hover:bg-primary-green-dark hover:text-primary-beige text-primary-green-dark px-3 rounded-md text-lg font-lato uppercase"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
                  <Link to="/">
                    <button
                      type="button"
                      className="uppercase text-lg font-lato text-primary-beige bg-primary-green-dark px-2 py-1 rounded-xl hover:bg-primary-green-darkest"
                    >
                      Donate
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="text-primary-green-dark focus:bg-primary-green-dark focus:text-primary-beige block px-3 py-2 rounded-md text-base font-lato"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  }
};

export default Navbar;
