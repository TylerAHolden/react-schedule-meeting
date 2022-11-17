import React, { useState } from 'react';
import { StartTimeGridItemButton, ThemedButton } from '../ThemedButton';

import { Arrow } from '../ArrowSVG';
import EventListItem from './StartTimeListItem';
import { StartTimeEvent } from './ScheduleMeeting';
import { format } from 'date-fns';
import styled from 'styled-components';

// @TODO okay this is getting a little silly maybe its time to consider context.
type Props = {
  skipConfirmCheck: boolean;
  selectedDay: Date;
  setSelectedStartTime: (value: number | undefined) => void;
  selectedStartTime?: number;
  startTimeListItems?: StartTimeEvent[];
  onStartTimeSelect: (startTimeEvent: StartTimeEvent) => void;
  emptyListContentEl?: React.ElementType;
  borderRadius: number;
  primaryColor: string;
  primaryColorFaded: string;
  format_startTimeFormatString: string;
  lang_emptyListText: string;
  lang_confirmButtonText: string;
  lang_cancelButtonText: string;
  lang_goToNextAvailableDayText: string;
  lang_noFutureTimesText: string;
  lang_selectedButtonText: string;
  onGoToNextAvailableDayClick: () => void;
  nextFutureStartTimeAvailable: undefined | Date;
  format_nextFutureStartTimeAvailableFormatString: string;
  startTimeListStyle?: 'scroll-list' | 'grid';
  locale?: Locale;
};

const ScrollListContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-bottom: 24px;
  padding-top: 16px;
`;

const GridContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  align-items: stretch;
  justify-content: flex-start;
  &.has-selection {
    ${StartTimeGridItemButton}:not(.is-selected) {
      opacity: 0.5;
    }
  }
`;

const ScrollEdgeFade = styled.div`
  position: absolute;
  width: 100%;
  height: 24px;
  left: 0;
  right: 0;
  z-index: 12;
  pointer-events: none;
  &.top {
    background: linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(0, 0, 0, 0));
    top: 42px;
  }
  &.bottom {
    bottom: 0;
    background: linear-gradient(0deg, rgba(255, 255, 255, 1), rgba(0, 0, 0, 0));
  }
`;

const ListItemDivider = styled.div<any>`
  flex-shrink: 0;
  flex: 1;
  padding: 0.5px;
  margin: 0px 8px;
  position: relative;
  background: ${({ makeTransparent }) => (makeTransparent ? `transparent` : `rgba(0, 0, 0, 0.05)`)};
`;

const StyledP = styled.p`
  margin: 0;
  opacity: 0.5;
  margin-bottom: 24px;
  font-size: 18px;
`;

const NoTimesAvailableContainer = styled.div`
  height: 100%;
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const GoToNextAvailableDayButton = styled(ThemedButton)`
  border: none;
  padding: 6px 18px;
  width: auto;
  text-align: left;
  p {
    margin: 0;
    color: inherit;
    font-weight: inherit;
    text-align: inherit;
  }
  small {
    font-weight: 700;
  }
  display: flex;
  align-items: center;
  svg {
    margin-left: 14px;
    margin-right: -4px;
  }
`;

const NoFutureTimesText = styled(StyledP)<{ borderRadius: number }>`
  font-size: 90%;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  border: 1px solid rgba(0, 0, 0, 0.5);
`;

const StartTimeList: React.FC<Props> = ({
  skipConfirmCheck,
  selectedDay,
  selectedStartTime,
  startTimeListItems = [],
  onStartTimeSelect,
  emptyListContentEl,
  lang_emptyListText,
  borderRadius,
  primaryColorFaded,
  primaryColor,
  format_startTimeFormatString,
  lang_confirmButtonText,
  lang_cancelButtonText,
  lang_goToNextAvailableDayText,
  lang_noFutureTimesText,
  lang_selectedButtonText,
  onGoToNextAvailableDayClick,
  nextFutureStartTimeAvailable,
  format_nextFutureStartTimeAvailableFormatString,
  startTimeListStyle,
  setSelectedStartTime,
  locale,
}) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

  React.useEffect(() => {
    setSelectedItemIndex(-1);
  }, [selectedDay]);

  const _onStartTimeSelect = (startTimeEvent: StartTimeEvent, index: number) => {
    if (skipConfirmCheck || selectedItemIndex === index) {
      onStartTimeSelect(startTimeEvent);
      setSelectedItemIndex(-1);
    } else {
      setSelectedItemIndex(index);
    }
  };

  const emptyListElement = (
    <NoTimesAvailableContainer>
      {emptyListContentEl || <StyledP className="rsm-empty-list-text">{lang_emptyListText}</StyledP>}
      {nextFutureStartTimeAvailable ? (
        <GoToNextAvailableDayButton
          type="button"
          selected
          className="rsm-next-available-date-button"
          borderRadius={borderRadius}
          primaryColorFaded={primaryColorFaded}
          primaryColor={primaryColor}
          onClick={onGoToNextAvailableDayClick}
        >
          <p>
            <small>{lang_goToNextAvailableDayText}</small>
            <br />
            {format(nextFutureStartTimeAvailable, format_nextFutureStartTimeAvailableFormatString, { locale })}
          </p>

          <Arrow direction="forward" />
        </GoToNextAvailableDayButton>
      ) : (
        <NoFutureTimesText borderRadius={borderRadius} className="rsm-no-future-times-text">
          {lang_noFutureTimesText}
        </NoFutureTimesText>
      )}
    </NoTimesAvailableContainer>
  );

  const handleCancelClicked = (startTimeEvent: StartTimeEvent) => {
    setSelectedItemIndex(-1);
    if (selectedStartTime && startTimeEvent.startTime.getTime() === selectedStartTime) {
      setSelectedStartTime(undefined);
    }
  };

  return (
    <>
      {startTimeListItems.length === 0 ? (
        emptyListElement
      ) : startTimeListStyle === 'scroll-list' ? (
        <>
          <ScrollEdgeFade className="top" />
          <ScrollEdgeFade className="bottom" />
          <ScrollListContainer>
            {startTimeListItems.map((startTimeEvent: any, i: number) => (
              <React.Fragment key={i}>
                <EventListItem
                  locale={locale}
                  lang_selectedButtonText={lang_selectedButtonText}
                  lang_confirmButtonText={lang_confirmButtonText}
                  lang_cancelButtonText={lang_cancelButtonText}
                  format_startTimeFormatString={format_startTimeFormatString}
                  primaryColorFaded={primaryColorFaded}
                  borderRadius={borderRadius}
                  primaryColor={primaryColor}
                  onCancelClicked={() => handleCancelClicked(startTimeEvent)}
                  selected={Boolean(selectedStartTime && selectedStartTime === startTimeEvent.startTime.getTime())}
                  confirmState={i === selectedItemIndex}
                  startTimeEvent={startTimeEvent}
                  onStartTimeSelect={() => _onStartTimeSelect(startTimeEvent, i)}
                />
                {i !== startTimeListItems.length - 1 && (
                  <ListItemDivider makeTransparent={selectedItemIndex === i || selectedItemIndex === i + 1} />
                )}
              </React.Fragment>
            ))}
          </ScrollListContainer>
        </>
      ) : (
        <GridContainer className={selectedStartTime ? 'has-selection' : ''}>
          {startTimeListItems.map((startTimeEvent: StartTimeEvent, i: number) => (
            <StartTimeGridItemButton
              key={i}
              type="button"
              className={
                selectedStartTime && selectedStartTime === startTimeEvent.startTime.getTime() ? 'is-selected' : ''
              }
              primaryColorFaded={primaryColorFaded}
              borderRadius={borderRadius}
              primaryColor={primaryColor}
              onClick={() => onStartTimeSelect(startTimeEvent)}
            >
              {format(startTimeEvent.startTime, format_startTimeFormatString, { locale })}
            </StartTimeGridItemButton>
          ))}
        </GridContainer>
      )}
    </>
  );
};
export default StartTimeList;
