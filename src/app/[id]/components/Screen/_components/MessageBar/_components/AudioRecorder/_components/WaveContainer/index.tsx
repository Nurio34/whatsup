import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import Wavesurfer from "wavesurfer.js";

function WaveContainer({
  WavesurferRef,
  setWaveSurfer,
}: {
  WavesurferRef: MutableRefObject<HTMLDivElement | null>;
  setWaveSurfer: Dispatch<SetStateAction<WaveSurfer | null>>;
}) {
  useEffect(() => {
    if (WavesurferRef.current) {
      const wavesurfer = Wavesurfer.create({
        container: WavesurferRef.current,
        waveColor: "red",
        progressColor: "blue",
        cursorColor: "yellow",
        barWidth: 3,
        height: "auto",
      });

      setWaveSurfer(wavesurfer);
    }
  }, []);

  return <div ref={WavesurferRef} className=" min-w-52 h-5 "></div>;
}

export default WaveContainer;
