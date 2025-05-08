
import React from 'react';

const CommentScrollbar: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="custom-scrollbar">
        {children}
      </div>
      <style>
        {`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(155,135,245,0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(155,135,245,0.5);
        }
        `}
      </style>
    </>
  );
};

export default CommentScrollbar;
