import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRealtions';

function ProfileSidebar(propriedades) {
    return (
        <Box as="aside">
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
    const usuarioAleatorio = 'tfabriciob';
    const [comunidades, setComunidades] = React.useState([{
        id: '97946542314697986546313465949',
        title: 'Eu odeio acordar cedo',
        image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
    }]);
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
                            const dadosDoForm = new FormData(e.target);
                            
                            console.log('Campo: ', dadosDoForm.get('title'));
                            console.log('Campo: ', dadosDoForm.get('image'));

                            const comunidade = {
                                id: new Date().toISOString(),
                                title: dadosDoForm.get('title'),
                                image: dadosDoForm.get('image'),
                            }

                            const comunidadesAtualizadas = [...comunidades, comunidade];
                            setComunidades(comunidadesAtualizadas)
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
                                    <li key={itemAtual}>
                                        <a href={`/users/${itemAtual}`}>
                                            <img src={`https://github.com/${itemAtual}.png`} />
                                            <span>{itemAtual}</span>
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </ProfileRelationsBoxWrapper>
                    <ProfileRelationsBoxWrapper>
                    <h2 className="smallTitle">
                            Comunidades ({comunidades.length})
                            <hr />
                        </h2>
                        <ul>
                            {comunidades.map((itemAtual) => {
                                return (
                                    <li key={itemAtual.id}>
                                        <a href={`/users/${itemAtual.title}`}>
                                            <img src={itemAtual.image} />
                                            <span>{itemAtual.title}</span>
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