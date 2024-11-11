import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FollicularPhase from './FollicularPhase';
import OvulatoryPhase from './OvulatoryPhase';
import MenstrualPhase from './MenstrualPhase';
import LutealPhase from './LutealPhase';

const PhaseDetail = () => {
  const { slug } = useParams();  
  const [phaseContent, setPhaseContent] = useState(null);

  
  useEffect(() => {
    
    switch (slug) {
      case 'follicular':
        setPhaseContent(<FollicularPhase />);
        break;
      case 'ovulatory':
        setPhaseContent(<OvulatoryPhase />);
        break;
      case 'menstrual':
        setPhaseContent(<MenstrualPhase />);
        break;
      case 'luteal':
        setPhaseContent(<LutealPhase />);
        break;
      default:
        setPhaseContent(<div>Phase not found</div>);
        break;
    }
  }, [slug]);

  return (
    <div>
      {phaseContent}
    </div>
  );
};

export default PhaseDetail;
