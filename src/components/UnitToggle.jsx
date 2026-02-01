import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toggleUnit } from "../store/settingsSlice/settingsSlice";
import { useEffect } from "react";

function UnitToggle() {
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.root.settings.unit);
  useEffect(() => {
    localStorage.setItem("unit", unit);
  }, [unit]);
  return (
    <div className="flex items-center gap-2">
      <Label>°C</Label>
      <Switch
        className={"cursor-pointer"}
        checked={unit === "F"}
        onCheckedChange={() => dispatch(toggleUnit())}
      />
      <Label>°F</Label>
    </div>
  );
}

export default UnitToggle;
