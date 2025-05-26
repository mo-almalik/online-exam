'use client';
import Image from 'next/image';
import logo from 'assets/images/logo.png';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftToLine, History, LayoutPanelLeft, FileText } from 'lucide-react';
import { signOut } from 'next-auth/react';

const items = [
  {
    title: 'Dashboard',
    link: '/dashboard',
    icon: <LayoutPanelLeft className='size-6' />,
  },
  {
    title: 'Quiz History',
    link: '/dashboard/quiz-history',
    icon: <History className='size-6' />,
  },
  {
    title: 'Exam',
    link: '/dashboard/exam',
    icon: <FileText className='size-6' />,
  },
];

export default function AsideBar() {
  const active = usePathname();

  return (
    <aside className='h-screen shadow-lg shadow-[#F9F9F9] rounded-sm py-5 hidden md:flex'>
      <div className='flex flex-col h-full gap-y-12 px-4 w-full'>
        {/* logo */}
        <div>
          <Image width={120} src={logo} alt='logo' />
        </div>

        {/* aside menu   */}
        <div className='flex flex-col space-y-4'>
          {items.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              className={`h-11 leading-[2.75rem] rounded-lg px-2 w-full flex items-center gap-x-5 transition-all duration-150
                ${
                  active === item.link ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <span
                className={`transition-all duration-150 ${
                  active === item.link ? 'text-white' : 'text-primary'
                }`}
              >
                {item.icon}
              </span>
              <span>{item.title}</span>
            </Link>
          ))}

          {/* logout btn     */}
          <button
            onClick={() =>
              signOut({
                callbackUrl: '/',
              })
            }
            className='h-11 leading-[2.75rem] rounded-lg px-2 w-full flex items-center gap-x-5 text-gray-600 hover:bg-gray-100 transition-all duration-150'
          >
            <ArrowLeftToLine className='size-6 text-primary' />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
