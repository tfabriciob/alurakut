import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRealtions';

function ProfileSidebar(propriedades) {
    return (
        <Box>
            <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
            <hr />
            
            <p>
                <a className="boxLink" href={`https://www.linkedin.com/in/tfabriciob`}>
                    @{propriedades.githubUser}
                </a><hr />
            </p>
            <AlurakutProfileSidebarMenuDefault />
        </Box>
    )
}

export default function Home() {
    const comunidades = React.useState('Alurakut');
    const usuarioAleatorio = 'tfabriciob';
    // const comunidades = ['Alurakut'];
    const pessoasFavoritas = [
        'rafaballerini',
        'felipefialho',
        'juunegreiros',
        'omariosouto',
        'jhonatan36',
        'caiotomich'
    ]

    return (
        <>
            <AlurakutMenu />
            <MainGrid>
                <div className="profileArea" style={{ gridArea: 'profileArea' }}>
                    <ProfileSidebar githubUser={usuarioAleatorio} />
                </div>
                <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
                    <Box>
                        <h1 className="title">Bem Vindo(a)<hr /></h1>
                        <OrkutNostalgicIconSet />
                    </Box>

                    <Box>
                        <h2 className="subTitle">O que deseja fazer hoje?</h2>
                        <form onSubmit={function hadleCriaComunidade(e) {
                            e.preventDefault(); //para de fazer o comportamento normal que seria o refresh

                            comunidades.push('Alura Stars');
                            console.log(comunidades);

                        }}>
                            <div>
                                <input 
                                    placeholder="Qual será o nome da sua comunidade?"
                                    name="title"
                                    arial-label="Qual será o nome da sua comunidade?"
                                    type="text"
                                />
                            </div>
                            <div>
                                <input 
                                    placeholder="Coloque uma URL para usarmos de capa"
                                    name="image"
                                    arital-label="Coloque uma URL para usarmos de capa"
                                />
                            </div>
                            <button>
                                Criar cominidade
                            </button>
                        </form>
                    </Box>
                </div>
                <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
                    <ProfileRelationsBoxWrapper>
                        <h2 className="smallTitle">
                            Pessoas da comunidade ({pessoasFavoritas.length})
                            <hr />
                        </h2>
                        <ul>
                            {pessoasFavoritas.map((itemAtual) => {
                                return (
                                    <li>
                                        <a href={`/users/${itemAtual}`} key={itemAtual}>
                                            <img src={`https://github.com/${itemAtual}.png`} />
                                            <span>{itemAtual}</span>
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </ProfileRelationsBoxWrapper>
                    <ProfileRelationsBoxWrapper>
                        <ul>
                            {comunidades.map((itemAtual) => {
                                return (
                                    <li>
                                        <a href={`/users/${itemAtual}`} key={itemAtual}>
                                            <img src={`http://placehold.it/300x300`} />
                                            <span>{itemAtual}</span>
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </ProfileRelationsBoxWrapper>
                </div>
            </MainGrid>
        </>
    )
}