import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Form.module.css'

import { useInsertDocument } from '../../hooks/useInsertDocuments'

const CreateDoc = () => {

  const [imagens, setImagens] = useState([])
  const [titulo, setTitulo] = useState('')
  const [valor, setValor] = useState()
  const [local, setLocal] = useState('')
  const [endereco, setEndereco] = useState('')
  const [quartos, setQuartos] = useState(0)
  const [banheiros, setBanheiros] = useState(0)
  const [garagem, setGaragem] = useState(false)
  const [piscina, setPiscina] = useState(false)
  const [descricao, setDescricao] = useState('')
  const [formError, setFormError] = useState("")
  const [venda, setVenda] = useState(true)
  const [aluguel, setAluguel] = useState(false)
  const [mtsqdd, setMtsqdd] = useState('')

  const {insertDocument, response} = useInsertDocument('venda')
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImagens(selectedImages);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setVenda(!aluguel)
    if(aluguel === false){
      setVenda(true)
    }
    console.log(venda)

    if(titulo === ''){
      setFormError('O titulo precisa ser preenchido');
      return
    } else if(titulo.length <= 5){
      setFormError("O titulo é muito curto")
      return
    }

    if(valor < 10){
      setFormError('O valor esta preenchido de forma errada')
      return
    }

    if(local === ''){
      setFormError('O local precisa ser preenchido')
      return
    }
    
    if(mtsqdd !== '' && parseFloat(mtsqdd) === isNaN){
      setFormError('Area foi preenchido de forma incorreta')
      return
    }
    
    if(mtsqdd === ''){
      setMtsqdd("0")
    }

    const area = parseFloat(mtsqdd)

    const preco = parseInt(valor)

    insertDocument({
      titulo,
      valor: preco,
      local,
      endereco,
      quartos,
      banheiros,
      garagem,
      piscina,
      descricao,
      venda,
      aluguel,
      area
    }, imagens)

    navigate("/dashboard")
  }

  if(formError !== ""){
    setTimeout(() => {
      setFormError("")
    }, 10000);
  }


  return (
    <div className={styles.form_container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label_input}>
            <span>Titulo:</span>
            <input type="text" name='titulo' value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder='O lugar e/ou tipo de imovel'/>
          </label>
          <label className={styles.label_input}>
            <span>Valor:</span>
            <input type="number" name='valor' value={valor} onChange={(e) => setValor(e.target.value)} placeholder='Valor do imovel (,00 nao precisa ser inserido)'/>
          </label>
          <div className={styles.campos_adicionais}>
            <label>
              <input type="checkbox"  value={aluguel} onChange={(e) => {
                setAluguel(e.target.checked)
                if(e.target.checked === true){
                  setVenda(false)
                } else {
                  setVenda(true)
                }
              }}/>
              <span> mês / aluguel:</span>
            </label>
            <label className={styles.label_input}>
              <span>Area: </span>
              <input type="text" value={mtsqdd} onChange={(e) => setMtsqdd(e.target.value)} placeholder='Area total'/>
            </label>
          </div>
          <label className={styles.label_input}>
            <span>Local:</span>
            <input type="text" name='local' value={local} onChange={(e) => setLocal(e.target.value)} placeholder='Apenas o bairro ou area do imovel (usado para o filtro de pesquisa)'/>
          </label>
          <label className={styles.label_input}>
            <span>Endereço:</span>
            <input type="text" name='endereco' value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder='O endereço completo do imovel'/>
          </label>
          
          <div className={styles.adicionais}>
            <div className={styles.adicional_input}>
              <label className={styles.label_input}>
                <span>Quartos:</span>
                <input type="number" name='quartos' value={quartos} onChange={(e) => setQuartos(e.target.value)} placeholder='Numero de Quartos'/>
              </label>
              <label className={styles.label_input} >
                <span>Banheiros:</span>
                <input type="number" name='banheiros' value={banheiros} onChange={(e) => setBanheiros(e.target.value)} placeholder='Numero de Banheiros'/>
              </label>
            </div>

            <div className={styles.radio}>
              <label htmlFor="garagem">Garagem: </label>
              <div>
                <input type="radio" name='garagem' onChange={() => setGaragem(true)} checked={garagem}/> sim
                <input type="radio" name='garagem' onChange={() => setGaragem(false)} checked={!garagem}/> nao
              </div>
              <label htmlFor="piscina">Piscina: </label>
              <div>
                <input type="radio" name='piscina' onChange={() => setPiscina(true)} checked={piscina}/> sim
                <input type="radio" name='piscina' onChange={() => setPiscina(false)} checked={!piscina}/> nao
              </div>
            </div>
          </div>
            <label className={styles.text_area}>
              <span>Descrição:</span>
              <textarea value={descricao} name='descricao' onChange={(e) => setDescricao(e.target.value)} placeholder='Descreva o imovel' ></textarea>
            </label>
            <label className={styles.image_inp}>
              <span>Imagens: <p className={styles.erro}>As Imagens nao poderao ser alteradas após o envio</p></span>
              <input type="file" name='imagens' accept='image/*' multiple onChange={handleImageChange}/>
            </label>
            <div className={styles.imageGrid}>
              {imagens.map((imagem, index) => <img key={index} src={URL.createObjectURL(imagem)} />)}
            </div>
            {formError === "" ? <button type='submit' className='primary_btn'>Adicionar Imovel</button> : <div>
              <p className='error'>{formError}</p>
              <button type='submit' className='primary_btn' disabled>Adicionar Imovel</button>
            </div>
              }
        </form>
    </div>
  )
}

export default CreateDoc