export const SignIn = ({ innerText = 'Sign in' }) => {
  return (
    <a
      href="/api/auth/signin"
      class='rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 px-3'
    >
      {innerText}
    </a>
  );
};

export const SignOut = ({ innerText = 'Sign out' }) => {
  return (
    <a
    href="/api/auth/signout"
      class='rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 px-3'
    >
      {innerText}
    </a>
  );
};
