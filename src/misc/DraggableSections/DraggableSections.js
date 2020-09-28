import React from "react";
import s from "./DraggableSections.module.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import SiteSection from "../SiteSection/SiteSection";

const DraggableSections = ({
  onDragEnd,
  sections,
  activeSections,
  showEditingModal,
  addSection,
  removeSection,
}) => {
  return (
    <DragDropContext {...{ onDragEnd }}>
      <Droppable droppableId="droppable123">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ marginBottom: "20px" }}
          >
            {sections.map((section, i) => (
              <Draggable
                key={section.id}
                draggableId={section.id}
                index={i + 1}
              >
                {(provided, snapshot) => (
                  <SiteSection
                    isActive={
                      !!activeSections.filter(
                        ({ categoryID }) => categoryID === section.categoryID
                      )[0]
                    }
                    {...{ showEditingModal }}
                    {...{ addSection }}
                    {...{ removeSection }}
                    {...{ section }}
                    reference={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableSections;
