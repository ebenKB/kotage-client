const sentenceCase = (text) => {
  const textArray = text.split(' ');
  const transformedText = textArray.map((t) => {
    const fisrtLetter = t[0].toUpperCase();
    return `${fisrtLetter}${t.substring(1, t.length)}`;
  });
  return transformedText.join(' ');
};

export default sentenceCase;
