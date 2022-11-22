export const SignalDevMode = () => {
  const _dev = process.env.REACT_APP_DEV_MODE === 'true';
  return (
    <>
      {_dev && (
        <div
          className="mode-signal"
          style={{
            color: '#f0f',
            background: '#222',
            padding: '8px',
            borderRadius: '2px',
          }}
        >
          Development mode is on
        </div>
      )}
    </>
  );
};
