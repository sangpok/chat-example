import { forwardRef } from 'react';

export const StyledApp = {
  Container: ({ children }) => (
    <div className=" flex flex-col w-screen h-screen p-6 gap-6">{children}</div>
  ),
  Form: ({ children, ...props }) => (
    <form className=" border rounded-sm flex justify-between" {...props}>
      {children}
    </form>
  ),
  HistoryWrapper: forwardRef(({ children, ...props }, ref) => (
    <ul
      className=" list-none border rounded-sm p-3 flex-1 flex gap-3 flex-col overflow-y-scroll"
      ref={ref}
      {...props}
    >
      {children}
    </ul>
  )),
  NoHistory: ({ children }) => (
    <div className=" w-full h-full flex place-content-center place-items-center">{children}</div>
  ),
  ChatItem: ({ children, me }) => (
    <li className={`${me ? 'self-end text-right text-blue-800' : ''}`}>{children}</li>
  ),
  ChatName: ({ children }) => <strong>{children}</strong>,
  ChatMessage: ({ children }) => <p>{children}</p>,
  NameInput: ({ children, ...props }) => (
    <input className=" py-1 px-3 w-1/4 font-bold outline-none appearance-none" {...props} />
  ),
  MessageInput: (props) => (
    <input
      className=" py-1 px-3 w-full outline-none appearance-none"
      {...props}
      autoComplete="off"
    />
  ),
  SubmitButton: ({ children, props }) => (
    <button className=" min-w-fit py-1 px-3 font-bold" type="submit">
      {children}
    </button>
  ),
};
