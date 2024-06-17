import React from 'react';
import { TabItemProps } from "../../types/TabsTypes";
import { sanitizeForId } from "../../utils/stringUtils";

const TabItem: React.FC<TabItemProps> = ({ label, children }) => (
  <div
    className="tab-panel"
    role="tabpanel"
    aria-labelledby={`tab-${sanitizeForId(label)}`}
    id={`panel-${sanitizeForId(label)}`}
  >
    {children}
  </div>
);

export default TabItem;