import React from 'react';

const Timeline = ({ activeStep = 0 }) => {
  return (
    <div className="mb-5 flex flex-wrap">
      {['User Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
        (step, index) => (
          <div
            key={step}
            className={`flex-1 border-b-2  
          text-center 
       ${
         index <= activeStep
           ? 'border-[#b2bc83]   text-[#b2bc83]  primary-clr font-bold'
           : 'border-gray-300 text-gray-300'
       }
          
       `}
          >
            {step}
          </div>
        )
      )}
    </div>
  );
};

export default Timeline;
