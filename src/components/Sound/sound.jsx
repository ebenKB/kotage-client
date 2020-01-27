import React from 'react';
import Sound from 'react-sound';

const KtSound = ({...rest}) => {
  // disable debug logs to the console
  window.soundManager.setup({debugMode: false});
  return (
	<>
		{
      rest.canPlaySound && (
	<Sound
    url={rest.url}
    playStatus={Sound.status.PLAYING}
    volume={50}
  />
    )
    }
	</>
  )
}

export default KtSound;
