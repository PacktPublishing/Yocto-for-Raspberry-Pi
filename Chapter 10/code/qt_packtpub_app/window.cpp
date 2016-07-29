#include "window.h"
#include <QCoreApplication>
 
Window::Window(QWidget *parent)
    : QMainWindow(parent)
{
    m_button = new QPushButton("Click Me!", this);
    m_button->setGeometry(QRect(QPoint(150, 150),
                QSize(200, 100)));
    connect(m_button, SIGNAL (released()), this, SLOT (handleButton()));
}
 
void Window::handleButton()
{
    m_button->setText("Quit");
    m_button->resize(150,150);
    connect(m_button, SIGNAL (released()), this, SLOT (quitButton()));
}

void Window::quitButton()
{
    QCoreApplication::quit();
}
