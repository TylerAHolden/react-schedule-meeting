import React from 'react';
import { StartTimeEvent } from './ScheduleMeeting';
import { ThemedButton } from '../ThemedButton';
import { format } from 'date-fns';
import { styled } from 'goober';

type Props = {
  onStartTimeSelect: () => void;
  startTimeEvent: StartTimeEvent;
  selected?: boolean;
  confirmState?: boolean;
  onCancelClicked: () => void;
  format_startTimeFormatString: string;
  format_startTimeTextString: string;
  lang_confirmButtonText: string;
  lang_cancelButtonText: string;
  lang_selectedButtonText: string;
  locale?: Locale;
};

const Container = styled('div')`
  display: flex;
  width: 100%;
  align-items: center;
`;

const CancelButton = styled('button')`
  padding: 8px 24px;
  border: none;
  background-color: rgb(0, 0, 0, 0);
  border-radius: var(--border-radius);
  outline: none;
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  height: 100%;
  color: rgba(var(--text-color-rgb), 1);
  &:hover {
    background-color: rgba(var(--background-color-contrast-rgb), 0.06);
  }
`;

const StartTimeListItem: React.FC<Props> = ({
  confirmState,
  onStartTimeSelect,
  startTimeEvent,
  selected,
  onCancelClicked,
  format_startTimeFormatString,
  format_startTimeTextString,
  lang_confirmButtonText,
  lang_cancelButtonText,
  lang_selectedButtonText,
  locale,
}) => {
  const parseString = (str: string, startTime: string, endTime: string) => {
    return str.replace(/\$startTime/g, startTime).replace(/\$endTime/g, endTime);
  }

  return (
    <Container className="rsm-start-time-item">
      <ThemedButton
        type="button"
        className="rsm-confirm-button"
        selected={Boolean(selected || confirmState)}
        onClick={onStartTimeSelect}
      >
        {confirmState && !selected && `${lang_confirmButtonText} `}
        {selected && `${lang_selectedButtonText} `}
        {format_startTimeTextString !== "" ? parseString(format_startTimeTextString, format(startTimeEvent.startTime, format_startTimeFormatString, { locale }), format(startTimeEvent.endTime, format_startTimeFormatString, { locale }) ) : format(startTimeEvent.startTime, format_startTimeFormatString, { locale })}
      </ThemedButton>
      {(confirmState || selected) && (
        <CancelButton type="button" className="rsm-cancel-button" onClick={onCancelClicked}>
          {lang_cancelButtonText}
        </CancelButton>
      )}
    </Container>
  );
};

export default StartTimeListItem;
