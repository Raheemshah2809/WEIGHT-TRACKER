import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import WeightOptionsMenu from './WeightOptionsMenu';
import { IoFlame } from 'react-icons/io5';

function Weight({ date, id, weight, weightId, movingAverageWeight = '-' }) {
  const [flameCount, setFlameCount] = useState(0); // Initialize the flame count to 0
  const [eligibleForFlame, setEligibleForFlame] = useState(false); // Initialize the eligibility to false

  // Get the current date and time
  const currentDate = new Date().getTime();

  // Calculate the difference between the current date and the weight date
  const differenceInMs = currentDate - new Date(date).getTime();
  const differenceInHours = differenceInMs / 1000 / 60 / 60;

  // Update the eligibility for a flame based on the time difference
  useEffect(() => {
    setEligibleForFlame(differenceInHours <= 24);
  }, [differenceInHours]);

  // Update the flame count whenever the user earns a new flame
  useEffect(() => {
    if (eligibleForFlame) {
      setFlameCount((prevCount) => prevCount + 1);
      console.log(`You earned a new flame! Total flames: ${flameCount + 1}`);
    }
  }, [eligibleForFlame]);

  return (
    <div
      id={id}
      className="flex h-[62px] w-full items-center justify-between px-4 py-1"
    >
      <h2 className="w-2/7">
        <Moment format={'MMM DD'}>{date}</Moment>
        {/* Show the flame icon only if the weight is eligible for a flame */}
        {eligibleForFlame && (
          <div className="flex justify-center">
            <IoFlame className="text-red-500" />
          </div>
        )}
      </h2>
      <h2 className="w-2/7">{weight} kg</h2>
      <h2 className="w-2/7">{movingAverageWeight} kg </h2>
      <div>
        <WeightOptionsMenu date={date} weightId={weightId} />
      </div>
    </div>
  );
}

export default Weight;
