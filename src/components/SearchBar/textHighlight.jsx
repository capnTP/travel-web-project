// @flow
import React from 'react';

const textHighlight = (text: string, higlight: string) => {
  const parts = text.split(new RegExp(`(${higlight})`, 'gi'));
  return (
    <span>
      {parts.map(
        (part, index) =>
          part.toLowerCase() === higlight.toLowerCase() ? <b key={index}>{part}</b> : part, // eslint-disable-line react/no-array-index-key
      )}
    </span>
  );
};

export default textHighlight;
