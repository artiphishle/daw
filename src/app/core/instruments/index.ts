import PollySynth from "@/app/core/instruments/synths/PollySynth";

import useBaseDrum from "@/app/core/instruments/drums/baseDrum/hooks/useBaseDrum";
import useSnareDrum from "@/app/core/instruments/drums/snareDrum/hooks/useSnareDrum";
import useHiHat from "@/app/core/instruments/drums/cymbal/hooks/useHiHat";

import useAmSynth from "@/app/core/instruments/synths/hooks/useAmSynth";
import useBassSynth from "@/app/core/instruments/synths/hooks/useBassSynth";
import useFmSynth from "@/app/core/instruments/synths/hooks/useFmSynth";
import useSampler from "@/app/core/instruments/sampler/hooks/useSampler";
import useSynth from "@/app/core/instruments/synths/hooks/useSynth";

export { useBaseDrum, useSnareDrum, useHiHat, useSampler, PollySynth };
export { useAmSynth, useBassSynth, useFmSynth, useSynth };
