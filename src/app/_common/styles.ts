const styles = {
  button: {
    navbar:
      'mr-1 w-10 h-10 p-2 bg-[#333] rounded-xs cursor-pointer hover:bg-[#222]',
  },
  dialog:
    'flex flex-col shadow-2xl p-4 w-22 absolute top-0 left-0 right-0 bottom-0',
  headings: {
    h1: 'text-3xl font-black',
    h2: 'text-2xl font-bold',
    h3: 'text-xl font-semibold',
  },
  main: 'flex flex-col flex-1', // h-full flex flex-1 justify-between',

  /*** @components */
  arranger: {
    main: 'flex flex-1 relative bg-zinc-900/80',
    ol: 'flex-1',
    innerBack: {
      main: 'grid absolute top-[32px] right-0',
      item: 'item: h-[40px] border-r border-r-white last:border-r-0',
    },
    inner: 'flex-1',
  },
  avatar: {
    main: 'flex items-center justify-center bg-zinc-900 text-white cursor-pointer w-12 h-12 hover:rotate-180',
    bordered: 'border border-zinc-600',
    rounded: 'rounded-full',
  },
  browser: {
    a: 'p-2 border border-zinc-600',
    main: 'w-4 h-4 mr-2',
    fileStyle: 'fill-green-200',
    folderStyle: 'fill-blue-200',
    liStyle: 'flex',
  },
  icon: {
    sm: 'w-[16px] h-[16px]',
    md: 'w-[24px] h-[24px]',
    lg: 'w-[32px] h-[32px]',
  },
  locator: 'bg-zinc-700 w-[1px] absolute top-0 bottom-0',
  menu: {
    main: 'absolute bg-black border border-zinc-700',
    nav: 'flex flex-col items-center',
    a: 'flex text-white py-2 px-4 gap-2 border-b border-zinc-600',
  },
  mixer: {
    main: 'h-full bg-zinc-950 flex w-full text-zinc-200 pl-[179px]',
    inner: 'flex w-full items-center',
    meter: 'w-full bg-zinc-900',
    meterActive: 'w-full bg-zinc-800',
    meterInactive: 'bg-zinc-900',
    track: {
      main: 'flex flex-col min-w-[93px] max-w-[150px] border-r border-r-zinc-700 pt-6 justify-center text-xs items-center content-end relative',
      inner: 'flex px-4 items-center gap-1 py-2',
      master: 'h-full',
      active: 'bg-zinc-900 text-zinc-300',
      inactive: '',
    },
  },
  navbar: {
    ui: 'p-4 flex flex-row w-full bg-zinc-900 text-white items-center justify-between',
    uiInner: 'flex px-4 py-2',
  },
  notes: {
    main: 'absolute flex flex-1 justify-center items-center text-center cursor-pointer text-[0.5rem] bg-blue-900 text-zinc-200 border border-blue-700',
  },
  portal: {
    main: 'fixed top-1/3 left-1/3 z-50 flex justify-center items-center bg-black/90 text-zinc-100 p-8 rounded-sm border border-zinc-700',
  },
  progression: {
    tr: 'border border-b-zinc-100',
    td1: 'h-[40px] mb-[4px] border-l border-l-white',
    td2: 'p-1',
    td3: 'p-1 bg-zinc-200',
  },
  sheet: {
    main: 'bg-white p-8',
  },
  time: {
    main: 'flex w-full text-zinc-500 text-xs',
    col1: 'w-[179px|',
    inner:
      'bg-zinc-950 text-zinc-300 flex flex-1 items-center px-1 py-2 border-r border-r-zinc-600',
  },
  track: {
    audio: 'w-full flex flex-col justify-center',
    active: 'font-bold bg-zinc-800 text-white',
    col1: {
      main: 'h-[40px] flex justify-between items-center px-4 pl-8 bg-black/10 text-white',
      name: 'whitespace-nowrap w-28 overflow-x-hidden text-ellipsis',
    },
    col2: {
      main: 'h-[40px] bg-zinc-900/50 relative flex w-full',
    },
    icon: 'fill-white w-[16px] h-[16px]', // TODO not white
    li: 'relative flex w-full h-[40px] text-black border-t-zinc-700 first:text-zinc-400 text-xs border-t border-t-zinc-700 last:border-b last:border-b-zinc-700',
  },
  transport: {
    main: 'flex px-4',
    inner: 'flex gap-2',
    control: 'flex items-center text-white px-4 mx-2 border-r border-r-[#555]',
    settings: {
      main: 'text-xs flex flex-col justify-between',
      inner: 'flex',
      input: 'ml-1 bg-transparent',
      item: 'flex items-center',
      label: 'text-cyan-300',
      position: 'text-white text-lg',
    },
  },
};

export default styles;
