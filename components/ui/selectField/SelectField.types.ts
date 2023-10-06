export interface ComponentProps {
  id: string;
  fontSize?: string;
  icon?: {
    active?: boolean;
    icon?: any;
  };
  placeholder?: string;
  list?: ListTypes[];
  state?: {
    // selectedOption: string | null;
    selectedOption: {
      title: string | null;
      value: string | null;
    } | null;
    // setSelectedOption: (selected: { title: string; value: string }) => void;
    setSelectedOption: any;
    selectedIcon?: any;
    // setSelectedIcon?: (icon: any) => void;
    setSelectedIcon?: any;
  };
  //
  toggleStyles?: {
    borderRadius?: string;
    border?: string;
    background?: string;
    // padding:
    boxShadow?: string;
    focus?: {
      border?: string;
      boxShadowColor?: string;
    };
  };
  //
  // listStyles: {};
  // listItemStyles: {};
}

export interface ListTypes {
  title: string;
  value: string;
  icon?: any;
}

export interface SelectFieldToggleProps {
  fontSize?: string;
  borderRadius?: string;
  border?: string;
  background?: string;
  // padding:
  boxShadow?: string;
  focus?: {
    border?: string;
    boxShadowColor?: string;
  };
}

export interface StyledListProps {
  active?: boolean;
  fontSize?: string;
}
