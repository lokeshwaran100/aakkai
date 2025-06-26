import * as React from 'react';

interface TabsProps {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
}

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

const TabsContext = React.createContext<{
  value: string;
  setValue: (value: string) => void;
}>({
  value: '',
  setValue: () => {},
});

export const Tabs: React.FC<TabsProps> = ({ defaultValue, className, children }) => {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<TabsListProps> = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, className, onClick, children }) => {
  const { value: selectedValue, setValue } = React.useContext(TabsContext);

  const handleClick = () => {
    setValue(value);
    if (onClick) onClick();
  };

  return (
    <button
      className={className}
      onClick={handleClick}
      data-state={value === selectedValue ? 'active' : 'inactive'}
      type="button"
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({ value, children }) => {
  const { value: selectedValue } = React.useContext(TabsContext);

  if (value !== selectedValue) return null;

  return <div>{children}</div>;
};