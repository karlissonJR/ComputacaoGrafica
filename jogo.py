import pygame

from pygame.locals import *
from OpenGL.GL import *
from OpenGL.GLU import *
from OpenGL.GLUT import *
from PIL import Image

from textura import obterTextura
from sprites import *
from objeto import Objeto

DISPLAY_WIDTH = 1250
DISPLAY_HEIGHT = 700
FPS = 60

pygame.init()
display =  pygame.display.set_mode((DISPLAY_WIDTH, DISPLAY_HEIGHT), DOUBLEBUF|OPENGL|OPENGLBLIT)
pygame.display.set_caption("Cowboy Fora da Lei")
clock = pygame.time.Clock()

gluOrtho2D(-100, 100, -100, 100)
glClearColor(1, 1, 1, 1)
glShadeModel(GL_SMOOTH)
glMatrixMode(GL_PROJECTION)
glLoadIdentity()
glDisable(GL_DEPTH_TEST)

glEnable(GL_BLEND)
glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA)

executando = True

#jogador
imgJogador = obterTextura(jogador_parado_direita[0])
posX = -95
posY = -80
altura = posY + 20
largura = posX + 15
jogador = Objeto(altura, largura, posX, posY, imgJogador, jogador_parado_direita)

while executando:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            executando = False

        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_RIGHT:
                jogador.setDireita(True)
                jogador.setImagens(jogador_correndo_direita)

            if event.key == pygame.K_LEFT:
                jogador.setEsquerda(True)
                jogador.setImagens(jogador_correndo_esquerda)

        if event.type == pygame.KEYUP:
            if event.key == pygame.K_RIGHT:
                jogador.setDireita(False)
                jogador.setImagens(jogador_parado_direita)

            if event.key == pygame.K_LEFT:
                jogador.setEsquerda(False)
                jogador.setImagens(jogador_parado_esquerda)

    glClear(GL_COLOR_BUFFER_BIT|GL_DEPTH_BUFFER_BIT)

    jogador.getObjeto()
    jogador.animacao()

    pygame.display.flip()
    clock.tick(60)

pygame.quit()
quit()