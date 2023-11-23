"use strict";
import { Button } from '@material-tailwind/react';
import { IconType } from 'react-icons';
import { useFunfactStore } from '@/app/stores/funfactStore';
import privateClient from '@/lib/api';
import { getFactVotesUrl } from '@/lib/urls';
import { useAuthStore } from '@/app/stores/authStore';
import { useRouter } from 'next/navigation';
import useStore from "@/app/stores/useStore";

export default function ToggleButton({
  reactionValue,
  Icon,
  index,
}: {
  reactionValue: string;
  Icon: IconType;
  index: number;
}) {
  const { funfactArray, fetchFunFacts } = useFunfactStore();
  const funfact = funfactArray![index];
  const { refreshToken } = useStore(useAuthStore, (state) => state) ?? {
    refreshToken: undefined,
  };
  const userAuthenticated = refreshToken ? true : false;
  const router = useRouter();

  const handlePress = async () => {
    if (!userAuthenticated) {
      router.push('/login');
      return;
    }
    console.log(funfact.userReaction);

    try {
      if (!funfact.userReaction) {
        const response = await privateClient.post(getFactVotesUrl(funfact.id, reactionValue));
        
        fetchFunFacts();
        console.log(response.status);
      } else {
        if (funfact.userReaction === reactionValue) {
          const response = await privateClient.delete(getFactVotesUrl(funfact.id, reactionValue));
          fetchFunFacts();
        } else {
          const response = await privateClient.patch(getFactVotesUrl(funfact.id, reactionValue));
          fetchFunFacts();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button ripple={true} className="flex justify-center p-1 " onClick={handlePress}>
        <Icon
          className={funfact.userReaction === reactionValue ? 'brightness-75' : 'brightness-100'}
          size={funfact.userReaction === reactionValue ? 17 : 20}
        />
      </Button>
    </div>
  );
}
