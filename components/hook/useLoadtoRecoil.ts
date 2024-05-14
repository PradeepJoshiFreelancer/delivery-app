import { useRecoilState } from "recoil";
import { parcelAtom, parcelStatusAtom } from "../store/atom/parcel";
import { nodeAtom } from "../store/atom/node";
import {
  getAllParcelData,
  getAllParcelTrackingData,
} from "../store/handller/parcel";
import { useEffect } from "react";
import { getAllNodesDetails } from "../store/handller/node";

interface Props {
  loadAllParcel?: boolean;
  loadAllParcelTracking?: boolean;
  loadAllNodes?: boolean;
}

const useLoadtoRecoil = ({
  loadAllParcel = false,
  loadAllParcelTracking = false,
  loadAllNodes = false,
}: Props) => {
  const [allParcel, setAllParcel] = useRecoilState(parcelAtom);
  const [allParcelTracking, setAllParcelTracking] =
    useRecoilState(parcelStatusAtom);
  const [allNodes, setAllNodes] = useRecoilState(nodeAtom);

  useEffect(() => {
    if (loadAllParcel && allParcel.length === 0) {
      getAllParcelData().then((response) => {
        setAllParcel(response.parcel);
      });
    }
  }, [loadAllParcel, allParcel, setAllParcel]);

  useEffect(() => {
    if (loadAllParcelTracking && allParcelTracking.length === 0) {
      getAllParcelTrackingData().then((response) => {
        setAllParcelTracking(response.allParcelTracking);
      });
    }
  }, [loadAllParcelTracking, allParcelTracking, setAllParcelTracking]);

  useEffect(() => {
    if (loadAllNodes && allNodes.length === 0) {
      getAllNodesDetails().then((response) => {
        setAllNodes(response.node);
      });
    }
  }, [loadAllNodes, allNodes, setAllNodes]);

  return {
    allParcel,
    allParcelTracking,
    allNodes,
  };
};

export default useLoadtoRecoil;
