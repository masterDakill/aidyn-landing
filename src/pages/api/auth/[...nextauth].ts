// import NextAuth from 'next-auth';
// import Credentials from 'next-auth/providers/credentials';
//
// /**
//  * MVP placeholder: credentials-based auth kept inactive until post-MVP.
//  * Activate only after configuring secure secret rotation and database adapters.
//  */
// export default NextAuth({
//   providers: [
//     Credentials({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         if (!credentials) {
//           return null;
//         }
//         // TODO: plug real identity provider once ready.
//         return null;
//       },
//     }),
//   ],
//   session: {
//     strategy: 'jwt',
//   },
// });
