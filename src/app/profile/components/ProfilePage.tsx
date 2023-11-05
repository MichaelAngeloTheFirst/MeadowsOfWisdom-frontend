'use client';
import InputComponent from './InputComponent';
import UsersFunFacts from './UsersFunFacts';
import { useFunfactStore } from '@/app/stores/funfactStore';
import { useAuthStore } from '@/app/stores/authStore';

function parseJwt(token: string | undefined) {
  if (!token) {
    return;
  }

  const base64Url = token.split('.')[1];

  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export default function ProfilePage() {
  const { funfactArray } = useFunfactStore();
  const { refreshToken } = useAuthStore((state) => state) ?? {
    refreshToken: undefined,
  };

  if (!funfactArray) return null;

  function currentUserID() {
    const data = parseJwt(refreshToken);
    return data;
  }

  return (
    <div className="flex w-1/2 flex-col justify-center">
      <div className="mt-3  border-2 border-solid border-gray-700 bg-white ">
        <InputComponent />
      </div>
      <div className="align-center relative flex flex-grow flex-col overflow-scroll overflow-x-hidden p-2 pt-5">
        {funfactArray.map(
          (funfact, i) =>
            currentUserID()['user_id'] === funfact.userId && (
              <UsersFunFacts key={funfact.id} funfact={funfact} index={i} />
            ),
        )}
      </div>
    </div>
  );
}
