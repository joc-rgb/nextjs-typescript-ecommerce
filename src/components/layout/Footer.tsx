import React from 'react'

import UnstyledLink from '@/components/links/UnstyledLink'

const Footer = () => {
    const links = [
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/contact-us', label: 'Contact Us' },
];
  return (
    
<footer className="p-4 bg-white border-t-2 b-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 ">
    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://github.com/jocxy" className="hover:underline">Jocelin Yen</a>
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 gap-3">
        {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink href={href} className='hover:text-gray-600'>
                  {label}
                </UnstyledLink>
              </li>
            ))}
    </ul>
</footer>

  )
}

export default Footer
