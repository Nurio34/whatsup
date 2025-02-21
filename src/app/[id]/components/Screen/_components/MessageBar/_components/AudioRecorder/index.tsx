import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import RecordingAnimation from "./_components/RecordingAnimation";
import RecordDuration from "./_components/RecordDuration";
import DeleteButton from "./_components/DeleteButton";
import WaveContainer from "./_components/WaveContainer";
import WaveSurfer from "wavesurfer.js";

function AudioRecorder({
  setIsAudioRecorderVisible,
}: {
  setIsAudioRecorderVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);

  const WavesurferRef = useRef<HTMLDivElement | null>(null);
  const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);

  const MediaRecorderRef = useRef<MediaRecorder | null>(null);
  const AudioRef = useRef<HTMLAudioElement | null>(null);

  const onDelete = () => {
    setIsAudioRecorderVisible(false);
  };

  const startRecording = () => {
    setIsRecording(true);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        MediaRecorderRef.current = mediaRecorder;

        if (AudioRef.current) {
          AudioRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordDuration(0);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRecording]);

  useEffect(() => {
    if (!waveSurfer) return;

    startRecording();

    waveSurfer.on("finish", () => {
      // setIsPlaying(false)
    });

    return () => {
      waveSurfer.destroy();
    };
  }, [waveSurfer]);

  return (
    <div className=" flex items-center gap-1">
      <DeleteButton onDelete={onDelete} />
      {isRecording && (
        <div className=" flex items-center gap-1">
          <RecordingAnimation />
          <RecordDuration recordDuration={recordDuration} />
          <WaveContainer
            WavesurferRef={WavesurferRef}
            setWaveSurfer={setWaveSurfer}
          />
          <audio ref={AudioRef} hidden></audio>
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;
