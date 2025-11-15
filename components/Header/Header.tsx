import Link from 'next/link'
import css from './Header.module.css'
import AuthNavigation from '../AuthNavigation/AuthNavigation';

export default function Header() {
  return (
    <header className={css.header}>
      <Link className={css.headerLink} href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation" className={css.navigation}>
        <ul className={css.navigation}>
          <li>
            <Link className={css.headerLink} href="/">Home</Link>
          </li>
        </ul>
        <ul className={css.navigation}>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}

// export default function Header() {
//   const pathname =usePathname();
//   const isAuthenticated = useAuthStore((store) => StaticRange.isAuthenticated)
// return (
//     <header className={css.header}>
//       <Container className={css.box}>
//         <Link href="/" className={css.logo}>
//           APP LOGO
//         </Link>
//         <nav>
//           <ul className={css.list}>
//             <li>
//               <Link
//                 className={clsx(css.link, pathname === "/" && css.active)}
//                 href="/"
//               >
//                 Home
//               </Link>
//             </li>
//             {isAuthenticated && (
//               <li>
//                 <Link
//                   className={buildLinkClassName({ pathname, slug: "/notes" })}
//                   href="/notes/filter/All"
//                 >
//                   Tags Menu
//                 </Link>
//               </li>
//             )}
//             <AuthNavigation />
//           </ul>
//         </nav>
//       </Container>
//     </header>
//   );
// };


