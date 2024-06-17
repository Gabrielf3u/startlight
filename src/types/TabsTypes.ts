import React from 'react';

export interface TabItemProps {
  label: string;
  children: React.ReactNode;
}

export interface TabListProps {
  activeTabIndex: number;
  children: React.ReactElement<TabItemProps> | React.ReactElement<TabItemProps>[];
}