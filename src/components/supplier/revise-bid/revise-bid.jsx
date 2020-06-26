import React, { useState } from 'react';
import BidEditor from '../bid-editor/bid-editor';

const ReviseBid = () => {
  const [bid] = useState({
    totalBidValue: 0,
    rfpID: null,
    currency: null,
    rfpQuestionResponses: [],
    technicalRequirements: [],
    commercialRequirements: [],
    questions: [
      {
        id: 1,
        question: 'How many years have you been in operations?',
      },
      {
        id: 2,
        question: 'How many years have you been in operations?',
      },
    ],
  });
  return (
	<BidEditor
		title="Revise Bid"
		bid={bid}
	/>
  );
};

export default ReviseBid;
