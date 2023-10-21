// @ts-nocheck

import { NuxtAuthHandler } from '#auth';
import {User} from '@/models/User.ts'

const { vatsim } = useRuntimeConfig();

export default NuxtAuthHandler({
  callbacks: {
    jwt: async ({ token, account, user: profileUser }) => {
      if (account && profileUser) {
        const user = await User.findOneAndUpdate(
          { cid: profileUser.id },
          {
            cid: profileUser.id,
            personal: profileUser.personal,
            vatsim: profileUser.vatsim,
          },
          {
            upsert: true,
          }
        );

        if (!user) return token;

        token.accessToken = account.access_token;
        token.user = profileUser;
        token.user = {
          ...token.user,
          personal: user.personal,
          vatsim: user.vatsim,
          bio: user.bio || '',
          flags: user.flags || [],
          _id: user._id,
        };
      }

      return token;
    },

    session: ({ token, session }) => {
      if (token) {
        // @ts-ignore
        session.user = token.user;
        // @ts-ignore
        session.accessToken = token.accessToken;
      }

      return session;
    },
  },

  providers: [
    {
      id: 'vatsim',
      name: 'VATSIM',
      type: 'oauth',
      version: '2.0',
      clientId: vatsim.clientId,
      clientSecret: vatsim.clientSecret,
      authorization: {
        url: `${vatsim.endpointUri}/oauth/authorize?client_id=${vatsim.clientId}`,
        params: {
          scope: 'full_name vatsim_details email country',
          client_id: vatsim.clientId,
          redirect_uri: vatsim.redirectUri,
          response_type: 'code',
        },
      },
      token: {
        url: `${vatsim.endpointUri}/oauth/token`,
        params: {
          client_id: vatsim.clientId,
          client_secret: vatsim.clientSecret,
          grant_type: 'authorization_code',
          redirect_uri: vatsim.redirectUri,
        },
      },
      userinfo: {
        url: `${vatsim.endpointUri}/api/user`,
      },

      async profile(profile) {
        // const user = await User.findOneAndUpdate(
        //   { cid: profile.data.cid },
        //   {
        //     cid: profile.data.cid,
        //     personal: profile.data.personal,
        //     vatsim: profile.data.vatsim,
        //   },
        //   {
        //     upsert: true,
        //   }
        // );

        return {
          id: profile.data.cid,
          email: profile.data.personal.email,
          name: profile.data.personal.name_full,
        };
      },
    },
  ],
});
